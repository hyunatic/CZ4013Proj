class BankAccount {
    constructor() {
        this.AccountList = []
    }
    OpenNewAccount(AccName, Password, Currency, Balance) {
        let accountExists = this.AccountList.some(x => x.AccName === AccName && x.Password === Password && x.Currency === Currency)
        if (!accountExists) {
            var AccountDetails = { AccountNo: (this.AccountList.length + 1).toString(), AccName, Password, Currency, Balance: Balance }
            this.AccountList.push(AccountDetails)
            return { 'Server-Response': AccountDetails.AccountNo }
        }
        return { 'Server-Response': "Account Exist" }
    }
    CloseAccount(AccountNo, AccName, Password) {
        var valid = this.AccountList.filter(x => x.AccountNo === AccountNo && x.AccName === AccName && x.Password === Password).length
        if (valid > 0) {
            this.AccountList = this.AccountList.filter(x => x.AccountNo !== AccountNo && x.AccName !== AccName && x.Password !== Password)
            return { 'Server-Response': 'Account Removed' }
        }
        return { 'Server-Response': 'Account Does Not Exist' }
    }
    GetAccountDetails(AccountNo, AccName, Password, Currency) {
        return { 'Server-Response': this.AccountList.filter((x => x.AccName === AccName && x.AccountNo === AccountNo && x.Password === Password && x.Currency === Currency)) }
    }
    Login(AccName, Password) {
        return { 'Server-Response': this.AccountList.filter((x => x.AccName === AccName && x.Password === Password)) }
    }
    DepositMoney(AccountNo, AccName, Password, Currency, Amount) {
        let objIndex = this.AccountList.findIndex((x => x.AccountNo === AccountNo && x.AccName === AccName && x.Currency === Currency && x.Password === Password))
        this.AccountList[objIndex].Balance += Amount
        return { 'Server-Response': this.AccountList.filter((x => x.AccName === AccName && x.AccountNo === AccountNo && x.Password === Password)) }
    }
    WithdrawMoney(AccountNo, AccName, Password, Currency, Amount) {
        let objIndex = this.AccountList.findIndex((x => x.AccountNo === AccountNo && x.AccName === AccName && x.Currency === Currency && x.Password === Password))
        this.AccountList[objIndex].Balance -= Amount
        return { 'Server-Response': this.AccountList.filter((x => x.AccName === AccName && x.AccountNo === AccountNo && x.Password === Password)) }
    }
    TransferMoney(AccountNo, AccName, Password, Currency, Amount, ReceipientName, ReceipientAccountNo) {
        let objIndex = this.AccountList.findIndex((x => x.AccountNo === AccountNo && x.AccName === AccName && x.Currency === Currency && x.Password === Password))
        this.AccountList[objIndex].Balance -= Amount

        let RobjIndex = this.AccountList.findIndex((x => x.AccName === ReceipientName && x.AccountNo === ReceipientAccountNo))
        this.AccountList[RobjIndex].Balance += Amount
        return { 'Server-Response': "Money Transfered Successfully" }
    }

}
module.exports = BankAccount 