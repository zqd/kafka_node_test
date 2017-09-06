const Kakfa = require('node-rdkafka')

const producer = new Kakfa.Producer({
    'client.id' :'kafka',
    'metadata.broker.list':'localhost:9092',
    'compression.codec':'gzip',
    'retry.backoff.ms':200,
    'message.send.max.retries':10,
    'socket.keepalive.enable':true,
    'queue.buffering.max.message':100000,
    'queue.buffering,max.ms':1000,
    'batch.num.message' : 1000000,
    'dr_cb':true
})

producer.connect()

producer.on('ready',function(){
    try{
        producer.produce(
            //topic
            'topic',
            //可选项，指定具体的partition，默认是-1--使用librdkafka的默认策略
            null,
            //send的message，如果是String会自动的转换成Buffer
            new Buffer('Awesome message'),
            //for keyd message ,可选。
            'Stormwind',
            //TODO 意义不明。
            Date.now()
        )
    }catch(err){
        console.error(err)
    }
})

producer.on('error',function(err){
    console.log('some errors')
    console.log(err)
})