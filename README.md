# MEAN_agency_project
MEAN full stack application made for college course project. It represents a home renovation agency.
There are 3 types of users: clients, agencies and administrator.
Frontend is done with Angular and backend with NodeJS. For the database MongoDB is used.

## How to run
If you don't have MEAN stack installed (otherwise skip to step 4):
1. Install NodeJS
2. In cmd run these commands:
+ ```npm install @angular/cli```
+ ```npm install -g typescript```
+ ```npm install -g express```
+ ```npm install -g mongoose```
3. Install MongoDB alongside MongoDBCompass
4. In MongoDBCompass make ***projekatDB*** database, create collections from the database folder and import them.

### Running the project
Create two directories:

1. **FRONTEND**
+ In cmd position to ***frontend*** directory and create new project using ```ng new project-name```. Enable rooting and set style to CSS.
+ Change ***src*** directory, ***angular.json*** and ***package.json*** with those from completed application and run ```npm update```.

2. **BACKEND**
+ In cmd position to ***backend*** directory and add ***src*** directory and ***package.json*** from completed application and run ```npm install```.

Finally, in ***frontend/project-name*** run ```ng serve --open``` and in ***backend*** run ```tsc``` and ```npm run serve```.