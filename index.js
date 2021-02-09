// Your code here
let createEmployeeRecord= function(emp) {
    return {
    firstName: emp[0],
    familyName: emp[1],
    title: emp[2],
    payPerHour: emp[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

let createEmployeeRecords = function(emps) {
    return emps.map(function(e){
        return createEmployeeRecord(e)
    })
}

let createTimeInEvent = function(employee, timeIn) {
    let [date, hour] = timeIn.split(' ')
    employee.timeInEvents.push({
        date,
        hour: parseInt(hour),
        type: 'TimeIn'
    })
    return employee 
}

let createTimeOutEvent = function(employee, timeOut) {
    let [date, hour] = timeOut.split(' ')
    employee.timeOutEvents.push({
        date,
        hour: parseInt(hour),
        type: 'TimeOut'
    })
    return employee
}

let hoursWorkedOnDate = function(employee, date) {
    let inTime = employee.timeInEvents.find(function(time) {return time.date === date})
    let outTime = employee.timeOutEvents.find(function(time) {return time.date === date})
    return (outTime.hour - inTime.hour) / 100
}

let wagesEarnedOnDate = function(employee, date) {
    let hours = hoursWorkedOnDate(employee, date)
    let rate = employee.payPerHour
    return hours * rate 
}

let allWagesFor = function(employee) {
    let dates = employee.timeInEvents.map(function(d){
        return d.date
    })
    let wages = dates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return wages 
}

let calculatePayroll = function(data) {
    let wages = data.map(function(emp){
        return allWagesFor(emp)
    })
    let payroll = wages.reduce(function(memo, w){
        return memo + w
    }, 0)
    return payroll 
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(e) {
        return e.firstName === firstName
    })
}