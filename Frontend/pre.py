import pandas as pd
from surprise import Dataset, Reader
from sklearn.model_selection import train_test_split

# Load the dataset
data = pd.read_csv('hotel_data.csv')

# Check for and handle missing values
print("Missing values before cleaning:")
print(data.isnull().sum())

# Drop rows with missing values
data = data.dropna()

# Convert categorical data to numeric
data['city'] = data['city'].astype('category').cat.codes
data['property_name'] = data['property_name'].astype('category').cat.codes

# Convert review count and ratings to numerical values
data['site_review_count'] = pd.to_numeric(data['site_review_count'], errors='coerce')
data['site_review_rating'] = pd.to_numeric(data['site_review_rating'], errors='coerce')

# Handle outliers or invalid entries
data = data[(data['site_review_count'] >= 0) & (data['site_review_rating'] >= 1) & (data['site_review_rating'] <= 5)]

# Normalize ratings if needed
min_rating = data['site_review_rating'].min()
max_rating = data['site_review_rating'].max()
data['site_review_rating'] = (data['site_review_rating'] - min_rating) / (max_rating - min_rating) * 4 + 1

# Prepare data for collaborative filtering
interaction_data = data[['uniq_id', 'property_name', 'site_review_rating']]
interaction_data = interaction_data.rename(columns={'site_review_rating': 'rating'})

# Prepare data for Surprise library
reader = Reader(rating_scale=(1, 5))  # Adjust the rating scale if needed
dataset = Dataset.load_from_df(interaction_data, reader)

# Split the data
trainset, testset = train_test_split(dataset, test_size=0.2)

print(f"Trainset: {len(trainset.all_ratings())} ratings")
print(f"Testset: {len(testset)} ratings")

# Optionally, save preprocessed data
data.to_csv('preprocessed_data.csv', index=False)
print("Preprocessed data saved to 'preprocessed_data.csv'")
