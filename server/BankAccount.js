class BankAccount {
    constructor() {
        this.AccountList = []
    }
    OpenNewAccount(AccName, Password, Currency, Balance) {
        let accountExists = this.AccountList.some(x => x.AccName === AccName && x.Password === Password && x.Currency === Currency )
        if (!accountExists) {
            var AccountDetails = { AccountNo: (this.AccountList.length + 1).toString(), AccName, Password, Currency, Balance }
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
        var check = this.AccountList.filter((x => x.AccName === AccName && x.Password === Password))
        return { 'Server-Response': (check.length > 0) ? check : "Account Doesn't Exist" }
    }
    DepositMoney(AccountNo, AccName, Password, Currency, Amount) {
        let objIndex = this.AccountList.findIndex((x => x.AccountNo === AccountNo && x.AccName === AccName && x.Currency === Currency && x.Password === Password))
        this.AccountList[objIndex].Balance += parseFloat(Amount)
        return { 'Server-Response': this.AccountList.filter((x => x.AccName === AccName && x.AccountNo === AccountNo && x.Password === Password)) }
    }
    WithdrawMoney(AccountNo, AccName, Password, Currency, Amount) {
        let objIndex = this.AccountList.findIndex((x => x.AccountNo === AccountNo && x.AccName === AccName && x.Currency === Currency && x.Password === Password))
        if (objIndex != -1) {
            if (this.AccountList[objIndex].Balance > Amount) {
                this.AccountList[objIndex].Balance -= parseFloat(Amount)
                return { 'Server-Response': this.AccountList.filter((x => x.AccName === AccName && x.AccountNo === AccountNo && x.Password === Password)) }
            }
            return {'Server-Response': 'Insufficient Balance'}
        }
        return {'Server-Response': 'Account Does Not Exist'}
    }
    TransferMoney(AccountNo, AccName, Password, Currency, Amount, ReceipientName, ReceipientAccountNo) {
        let objIndex = this.AccountList.findIndex((x => x.AccountNo === AccountNo && x.AccName === AccName && x.Currency === Currency && x.Password === Password))
        if (objIndex != -1) {
            if (this.AccountList[objIndex].Balance > parseFloat(Amount)) {
                this.AccountList[objIndex].Balance -= parseFloat(Amount)
                let RobjIndex = this.AccountList.findIndex((x => x.AccName === ReceipientName && x.AccountNo === ReceipientAccountNo))
                if (RobjIndex != -1){
                    this.AccountList[RobjIndex].Balance += parseFloat(Amount)
                    return { 'Server-Response': this.AccountList.filter((x => x.AccName === AccName && x.AccountNo === AccountNo && x.Password === Password)) } 
                }
                return {'Server-Response': 'Recipient Account Does Not Exist'}
            }
            return {'Server-Response': 'Insufficient Balance'}
        }
        else {
            return {'Server-Response': 'Sender Account Does Not Exist'}
        }
    }

}
module.exports = BankAccount 