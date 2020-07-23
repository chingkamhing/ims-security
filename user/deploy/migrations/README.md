mongodb database migrate up or down command scripts

* start user service  (i.e. invoke "./user service") will migrate up automatically
* invoke "user db migrate-up" to manually migrate up
* invoke "user db migrate-down" to manually migrate down
* during database migration up, *.up.json scripts will be run in alphabetical order
* during database migration down, *.down.json scripts will be run in reversed alphabetical order
* the reference of the commands can be found in https://docs.mongodb.com/manual/reference/command/
