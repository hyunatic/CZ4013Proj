class History {
    constructor() {
        this.HistoryList = []
    }
    checkHistory(request, func) {
        return this.HistoryList.some(x => x.AccountNo === request.AccountNo && x.AccName === request.AccName && x.Password === request.Password && x.Function === func)
    }
    addNewHistoryEntry(request, func) {
        request["Function"] = func
        this.HistoryList.push(request)
    }
    removeHistoryEntry(request) {
        this.HistoryList.filter(x => x.AccountNo !== request.AccountNo && x.AccName !== request.AccName && x.Password !== request.Password)
    }
}
module.exports = History