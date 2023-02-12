function getDate (time, time_type) {
    switch (time_type) {
        case 'day':
            return Math.floor( Date.now() / 1000) + (time * 86400);

        case 'hour':
            return Math.floor( Date.now() / 1000) + (time * 3600)

        case 'minute':
            return Math.floor( Date.now() / 1000) + (time * 60)

        case 'second':
            return Math.floor( Date.now() / 1000) + time
        
        default:
            return Math.floor( Date.now() / 1000)
    }
    
}

function timeParser (date, time, timezone) {
    let unixstamp = 0
    //PROCESSING DATE
    unixstamp = Math.floor(Date.parse(date) / 1000 )

    //PROCESSING TIME
    let arrayTime = time.split(':')
    let hourTime = Number(arrayTime[0])
    let minutesTime = Number(arrayTime[1])

    //PROCESSING TIMEZONE
    let arrayTimezone = timezone.split(':')
    let hourTimezone = Number(arrayTimezone[0])
    let minutesTimezone = Number(arrayTimezone[1])

    //JOINING ALL DATE INFO
    unixstamp = unixstamp + ((hourTime - hourTimezone) * 3600)
    unixstamp = unixstamp + ((minutesTime + minutesTimezone) * 60)

    return unixstamp
}

module.exports={
    timeParser,
    getDate
}