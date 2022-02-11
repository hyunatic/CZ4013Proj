import java.util.stream.Collectors;
import java.util.List;
import java.util.ArrayList;

public class Bank {

    private int AccNo;
    private String Name;
    private String Password;
    private String Currency;
    private float Balance;

    static List<Bank> bankAccounts = new ArrayList<Bank>();

    public Bank(){}

    public Bank(int accno, String name, String password, String currency, float balance){
        this.AccNo = accno;
        this.Name = name;
        this.Password = password;
        this.Currency = currency;
        this.Balance = balance;
    }
    public int getAccNo() {
        return this.AccNo;
    }
    public String getName(){
        return this.Name;
    }
    public String getPassword(){
        return this.Password;
    }
    public String getCurrency(){
        return this.Currency;
    } 
    public float getBalance(){
        return this.Balance;
    }
    public void getBankAccounts(){
        for (int i = 0; i < bankAccounts.size();i++){
            System.out.println(bankAccounts.get(i));
        }
    }
    public int CreateAccount(String name, String password, String currency, float balance){
        bankAccounts.add(new Bank(bankAccounts.size(), name, password, currency, balance));
        return bankAccounts.size();
    }
    public boolean DeleteAccount(String name, int accno, String password){
        List<Bank> bankBuffer = bankAccounts.stream().filter(x -> name.equals(x.getName()) && accno == x.getAccNo() && password.equals(x.getPassword())).collect(Collectors.toList());
        if(bankAccounts.size() > bankBuffer.size()){
            bankAccounts = bankBuffer;
            return true;
        }
        else 
            return false;
    }

}