# Getting Started with Inmagin frontend-owner project

This project is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Make sure that you install Yarn

The project environment must add to project manually by adding .env file to root path (base on .env.example)

In the project directory for installing node module dependencies, you can run:

### `yarn`

In the project directory for starting, you can run:

### `yarn start`

1-In start tou must first login to the system (email and password are set in backend .env)
2-The owner panel had 3 separated part! actually we try to make the allocations tables to customers more dynamically

Three part of panel

## A-general setting:

-Which let us to change the 'Max no of tables' and 'Max no of chairs at every table' anytime we want

## B-table management

-You can add new table with selected chair numbers
-You can remove available tables (which are not occupied)
-You can set occupied tables as available and it will set the first queue member automatically to tables (if it is logically possible)

## C-queue management

-You can see the queue list of customers
-You can remove customers from queue list

## The panel will automatically fetch data from backend every 10 second

## We also put the "refresh" button in panel for refetching data manually
