TODO
====

MongoDbAppender has to be 'yielded' before it connects
------------------------------------------------------
Due to the workings of NodeJs/v8, MongoDb will not connect/get the colleciton until the main 'thread' is 'yielded' (i.e., until is has nothing more to do and another callback/timeout will be fired.) This means that if the loggers/appenders are built, and the main 'thread' is running from the start, the MongoDbAppender will not be connected and thus the appender will have nothing to append to. This should somehow be fixed.

MongoDbAppender should be in its own module
-------------------------------------------
MongoDbAppender should be in its own module. Blammo should be as lightweight as possible. Non-core functionality, such as the MongoDbAppender, should be in its own module.

However, due to cyclic dependencies, it is not possible to put the MongoDbAppender in a separate module. The MongoDbAppender would be loaded by the configuration_reader.js file on load time of Blammo. The filtering part of the Appenders is required by Blammo, thus the MongoDbAppender has to require Blammo. Hence, a cycling dependency.

To fix this issue, the filtering part of the Appender has to be separated from the Appender. I.e., a bit of refactoring is in place. Or, at runtime, the filtering mechanism could be mixed in as well.
