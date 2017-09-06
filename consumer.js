const Kafka = require('node-rdkafka')

const consumer = new Kafka.Consumer({
    'group.id':'kafka',
    'metadata.borker.list' : 'localhost:9092'
},{})

consumer.connect()

consumer.on('ready',function(){
    consumer.subscribe(['librdtesting-01'])

    //flowing mode
    consumer.consume()
}).on('data',function(data){
    console.log(data.message.toString(data))
})