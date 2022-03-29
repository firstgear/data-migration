# Data Migration

Usecase: Company is planning on migrating production data from legacy system to new cloud based solution. Goal is to simulate this migration with randomly generated test data to assess various migration strategies.

## Step 1. Generate Test Data

Data resides in 3 database tables:
* Customer
* InsuranceProduct
* InsurancePolicy

```json
Sample-Customer = {
  CustomerID: 'cust-01353741',
  Prefix: 'Mrs.',
  FirstName: 'Jan Jaap',
  LastName: 'de Vos',
  Address: '1097 Upra Place',
  City: 'Roppeja',
  Zip: '9477AZ',
  Country: 'NL',
  Phone: '+31699828357',
  Email: 'posopu@fotju.hr',
  DateOfBirth: '6/17/1973',
  Gender: 'Male',
  Username: 'Shark6879'
}

Sample-InsuranceProduct = {
  ProductID: 'prod-92d6aa1e',
  ProductName: 'NON-LIFE - autoverzekering / car'
}

Sample-InsurancePolicy = {
  PolicyID: 'plcy-e9aae009',
  CustomerID: 'cust-e5c201a8',
  ProductID: 'prod-bff0437c'
}
```

Generate test data
```bash
$ cd ./01-Generate-Test-Data
$ node GenerateSampleData.ts
$ cd CSV
$ ls
$ InsuranceCustomer.csv InsurancePolicy.csv   InsuranceProduct.csv

```

## Step 2. Deploy Data Components as Code

Data ingested from legacy system is stored as Comma Seperated Value (CSV) file in S3 Bucket. Then a Glue Crawler detects the various database attributes of those 3 database tables.

1. Create S3 bucket
2. Upload CSV Test Data
3. Create Glue Crawler incl Classifiers
4. Run Glue Crawler On-Demand (manual step)

Deploy data components
```bash
$ cd ../../02-AWS-Data-Infra
$ cdk synth
$ cdk deploy
```

## Step 3. Denormalize data

...
