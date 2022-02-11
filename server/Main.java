
public class Main{
    
    public static void main(String args[]){
        Bank abcBank = new Bank();
        abcBank.CreateAccount("Iskandar", "123", "SGD", 20.0f);
        abcBank.getBankAccounts();
    }
}