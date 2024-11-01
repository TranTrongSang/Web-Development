// DI là một design pattern
//Step 1: Define the Interface
class DatabaseService
{
    connect()
    {
        throw new Error("Method 'connect()' must be implemented");
    }
    getUserData()
    {
        throw new Error("Method 'getUserData()' must be implemented");
    }
}

//Step 2: Create Concrete Implementations for MySQL and SQL Server 

class MySQLDatabaseService extends DatabaseService
{
    connect()
    {
        return "Connected to MySQL Server!";
    }   
    getUserData()
    {
        return "Fetched user data from  MySQL DB!";
    }
}

class SQLServerDatabaseService extends DatabaseService
{
    connect()
    {
        return "Connected to SQL Server!";
    }   
    getUserData()
    {
        return "Fetched user data from SQL Server DB!";
    }
}

//Step 3: Inject Dependency into UserService 
//The UserService will accept any implementation of DatabaseService, making it database-agnostic. 
class UserService 
{
    constructor(databaseService)
    {
        this.databaseService = databaseService;
    }
    connectToDatabase()
    {
        return this.databaseService();
    }
    fetchUserData()
    {
        return this.databaseService.getUserData();
    }
}

//Step 4: Usage with Dependency Injection 
/*
Now, we can easily switch between MySQLDatabaseService and 
SQLServerDatabaseService when creating UserService. 
*/ 

const mySQLDatabaseService = new DatabaseService();
const userServiceMySQL = new UserService(mySQLDatabaseService);

console.log(userServiceMySQL.connectToDatabase);
console.log(userServiceMySQL.fetchUserData);

const sqlServerDatabaseService = new SQLServerDatabaseService();
const userServiceSQLServer = new UserService(sqlServerDatabaseService);

console.log(userServiceSQLServer.connectToDatabase);
console.log(userServiceSQLServer.fetchUserData);


