# LA Metered Parking Recommendation

Welcome to Team Data Wanderers Project Repository.



## Preprocessing

The scripts in the preprocessing folder perform the following tasks.



### Fetch data 

`Citation Data_Data Fetching` and `Crime Data_Data Fetching` fetch datasets from the [Los Angeles Open Data](https://data.lacity.org/) using [Socrata Open Data API](https://dev.socrata.com/).



### Preprocess datasets

`Citation Data_Complete Dataset` and `Crime Data_Complete Dataset` preprocess data fetched by removing missing values, converting datatypes, and formatting location information columns.



### Conduct analysis and aggregation

`Citation Data_Aggregation` and `Crime Data_Aggregation` aggregate time-series and corresponding citation/crime data in different levels and  conduct analysis on crime codes and citation codes. Then`Citation Check` and `Crime Check` analyze corresponding data within the 2 miles radius in `6 points of interest` that we picked in the city of Los Angeles.



### Plot and visualization

Visualization within different levels is created in `Generate Plots`.

