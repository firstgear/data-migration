// Load Chance
let Chance = require('chance');

// Instantiate Chance so it can be used
let chance = new Chance();

// Write table to CSV including headers
const fastcsv = require('fast-csv');
const fs = require('fs');

// Customer database table
const Customer = [];
function generateCustomer(){
    return {
        CustomerID: "cust-" + chance.guid().slice(0,8),
        Prefix: chance.prefix(),
        FirstName: chance.first({ nationality: 'nl' }),
        LastName: chance.last({ nationality: 'nl' }),
        Address: chance.address(),
        City: chance.city(),
        Zip: chance.integer({ min: 1000, max: 9999 }) + chance.letter({casing: 'upper'}) + chance.letter({casing: 'upper'}),
        Country: 'NL',
        Phone: "+316" + chance.integer({ min: 10000000, max: 99999999 }),
        Email: chance.email(),
        DateOfBirth: chance.birthday({string: true}),
        Gender: chance.gender(),
        Username: (chance.animal() + chance.integer({ min: 1000, max: 9999 })).replace(/ /g, "")
    }
}
for(let i=0; i<10; i++){
    Customer.push(generateCustomer())
}
console.log("Customer");
console.log(Customer[0]);
console.table(Customer);

const ws_cust = fs.createWriteStream("./CSV/Customer/InsuranceCustomer.csv");
fastcsv
  .write(Customer, { headers: true })
  .pipe(ws_cust);

// Insurance products life and non-life
const InsuranceProduct = [];
let Categories = [
    'NON-LIFE - autoverzekering / car',
    'NON-LIFE - woonverzekering  / home',
    'NON-LIFE - inboedelverzekering / home',
    'NON-LIFE - brommerverzekering / moped',
    'NON-LIFE - scooterverzekering / scooter',
    'NON-LIFE - dierenverzekering / pet',
    'NON-LIFE - aansprakelijkheidsverzekering / liability',
    'NON-LIFE - reisverzekering / travel',
    'NON-LIFE - fietsverzekering / bike',
    'NON-LIFE - motorverzekering / motorcycle',
    'NON-LIFE - ongevallenverzekering / accident',
    'NON-LIFE - rechtsbijstandverzekering / legal',
    'NON-LIFE - caravanverzekering / caravan',
    'LIFE - zorgverzekering / health',
    'LIFE - basisverzekering / basic',
    'LIFE - aanvullende verzekering / additional',
    'LIFE - tandartsverzekering / dental',
    'LIFE - eigen risico / own risk'
]
function generateCategory(i){
    return {
        ProductID: "prod-" + chance.guid().slice(0,8),
        ProductName: Categories[i]
    }
}
for(let i=0; i<Categories.length; i++){
    InsuranceProduct.push(generateCategory(i))
}
console.log("InsuranceProduct");
console.log(InsuranceProduct[0]);
console.table(InsuranceProduct);

const ws_prod = fs.createWriteStream("./CSV/Product/InsuranceProduct.csv");
fastcsv
  .write(InsuranceProduct, { headers: true })
  .pipe(ws_prod);

// Insurance Policies table
const InsurancePolicy = [];
function generateInsurancePolicy(){
    let randomProductID = Math.floor(Math.random() * InsuranceProduct.length);
    let ProductID = InsuranceProduct[randomProductID].ProductID;
    let randomCustomerID = Math.floor(Math.random() * Customer.length);
    let CustomerID = Customer[randomCustomerID].CustomerID;
    return {
        PolicyID: "plcy-" + chance.guid().slice(0,8),   // PK
        CustomerID: CustomerID,
        ProductID: ProductID   // FK
    }
}
for(let i=0; i<10; i++){
    InsurancePolicy.push(generateInsurancePolicy())
}
console.log("InsurancePolicy");
console.log(InsurancePolicy[0]);
console.table(InsurancePolicy);

const ws_plcy = fs.createWriteStream("./CSV/Policy/InsurancePolicy.csv");
fastcsv
  .write(InsurancePolicy, { headers: true })
  .pipe(ws_plcy);
