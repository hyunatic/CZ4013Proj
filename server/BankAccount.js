class BankAccount {
    constructor() {
        this.AccountList = []
    }
    OpenNewAccount(AccName, Password, Currency, Balance) {
        //{ AccName : AccName } = { AccName } [ShortCut]
        var AccountDetails = { AccountNo: this.AccountList.length + 1, AccName, Password, Currency, Balance }
        this.AccountList.push(AccountDetails)
        return AccountDetails.AccountNo
    }
    CloseAccount(AccountNo, AccName, Password) {
        var valid = this.AccountList.filter(x => x.AccountNo === AccountNo && x.AccName === AccName && x.Password === Password).length
        if (valid > 0) {
            this.AccountList = this.AccountList.filter(x => x.AccountNo !== AccountNo && x.AccName !== AccName && x.Password !== Password)
            return "Account Removed"
        }
        return "Account not found"
    }
    DepositMoney(AccountNo, AccName, Password, Currency, Amount) {
        objIndex = this.AccountList.findIndex((x => x.AccName === AccName && x.AccountNo === AccountNo && x.Password === Password))
        this.AccountList[objIndex].Balance += Amount
        return "Current Balance: " + this.AccountList[objIndex].Balance 
    }
    WithdrawMoney(AccountNo, AccName, Password, Currency, Amount) {
        objIndex = this.AccountList.findIndex((x => x.AccName === AccName && x.AccountNo === AccountNo && x.Password === Password))
        this.AccountList[objIndex].Balance -= Amount
        return "Current Balance: " + this.AccountList[objIndex].Balance 
    }
    ChangePassword(AccountNo, AccName, OldPassword, NewPassword){
        objIndex = this.AccountList.findIndex((x => x.AccName === AccName && x.AccountNo === AccountNo && x.Password === OldPassword))
        this.AccountList.Password = NewPassword
        return "Password Changed Successfully"
    }
    TransferMoney(AccountNo, AccName, Password, Currency, Amount, ReceipientName, ReceipientAccountNo){
        objIndex = this.AccountList.findIndex((x => x.AccName === AccName && x.AccountNo === AccountNo && x.Password === Password))
        this.AccountList[objIndex].Balance -= Amount

        RobjIndex = this.AccountList.findIndex((x => x.AccName === ReceipientName && x.AccountNo === ReceipientAccountNo))
        this.AccountList[objIndex].Balance += Amount
        return "Money Transfered"
    }

}
module.exports = BankAccount 