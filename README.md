# Consumer App v1

Consumer App is a React App using Spring Boot and H2 as a persistence layer. React application is **self contained in spring boot app**

## Installation

run Maven steps

```bash
mvn clean package
```


## Running
```bash
mvn spring-boot:run
```


## Documentation

[Swagger UI](http://localhost:8080/swagger-ui/index.html#/)

## Usage
[Web UI](http://localhost:8080)

## Author
Diogo Rodrigues

[Contact](rodrigues.jdiogo@gmail.com)

### Included
* React App
  * CRUD
  * 1 Unit Tests (Jest)
  * 1 IT Test (Cypress)
    
* Micro Service
  * CRUD with h2 DB
  * 1 Unit Tests (Junit)
  * 1 IT Test (Spring Test)

### Future (need at least 4 more hours =P )

* Backend
1. Extend EJB validation (currently only zip code has validation)
2. Add custom Exceptions (for http errors) and extend ValidationMessages per locale 
3. Extend IT tests (only a sample test was implemented )
4. Extend unit Tests (junit)

* Frontend
1. Add form validations (https://react-hook-form.com/) and use backend http responses
2. Add error handling for http requests
3. Extract some inline CSS
4. Extend unit Tests (only a sample Jest was implemented)
5. Extend IT tests (only sample Cypress test was implemented)
