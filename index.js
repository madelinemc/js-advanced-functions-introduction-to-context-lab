// Your code here

function createEmployeeRecord(employeeArray) {
    // returns javascript object with keys of new employee
    return {
        firstName: employeeArray[0], 
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3], 
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfEmployeeArrays) {
    //returns array of objects
    return arrayOfEmployeeArrays.map(function(eachEmployeeArray){
        return createEmployeeRecord(eachEmployeeArray)
    })
}

function createTimeInEvent(employeeRecord, dateStamp){
    //returns the employee record after adding an object 
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    //returns the employee record after adding an object 
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, givenDate){
    //given a date find the number of hours elapsed between that dates timeInEvent and timeOutEvent
    //returns hours worked as an integer
    let timeIn = employeeRecord.timeInEvents.find(function(e){
        return e.date === givenDate
    })

    let timeOut = employeeRecord.timeOutEvents.find(function(e){
        return e.date === givenDate
    })

    const hoursWorked = (timeOut.hour - timeIn.hour) / 100

    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, givenDate){
    //using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed
    //returns pay owed as integer
    let wage = hoursWorkedOnDate(employeeRecord, givenDate)
    return employeeRecord.payPerHour * wage
}

function allWagesFor(employeeRecord){
    //using wagesEarnedonDate, accumulate the value of all dates worked by the employee in the record 
    //returns pay owed for all dates as a number
    //HINT: "find the available dates somehow"
    let dates = employeeRecord.timeInEvents.map(function(e){
        return e.date
    })

    let pay = dates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(employeeRecord, date)
    }, 0)

    return pay
}

function findEmployeeByFirstName(srcArray, firstName){
    //test the firstName field for a match with firstName argument
    //returns matching record or undefined
   return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(arrayOfEmployeeRecords){
    //using wagesEarnedOnDate accumulate the value of all dates worked by the employee in the record used as context
    //returns the total amount of what is owed to all employees for all dates as a number
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}