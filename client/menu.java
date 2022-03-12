import javax.swing.*;
import java.awt.event.*;

public class menu  {

        JLabel welcome = new JLabel("Welcome   Xxxx Xxxx ");
        JFrame frame = new JFrame();
        JPanel contentPanel = new JPanel();
        JButton transferMoney = new JButton();
        JButton removeAccountBtn = new JButton();
        JButton depositBtn = new JButton();
        JButton withdrawBtn = new JButton();
        JTable accountTable;
        JMenuBar menuBar = new JMenuBar();
        JMenu fileMenu = new JMenu();
        JMenuItem exitMenuItem = new JMenuItem();
       

    public void menupage(){
        
        JLabel Balance = new JLabel("Balance: ");
        welcome.setBounds(350,20,200,25);
        Balance.setBounds(30,150,200,25);


        transferMoney.setText("Transfer");
        transferMoney.setBounds(260,50,110,30);
        transferMoney.addActionListener(new Buttonlistener());
        
        removeAccountBtn.setText("Remove Account");
        removeAccountBtn.setBounds(375,50,110,30);
        removeAccountBtn.addActionListener(new Buttonlistener());
        //removeAccountBtn.setEnabled(false);

        depositBtn.setText("Deposit");
        depositBtn.setBounds(30,50,110,30);
        //depositBtn.setEnabled(false);
        depositBtn.addActionListener(new Buttonlistener());

        withdrawBtn.setText("Withdrawal");
        withdrawBtn.setBounds(145,50,110,30);
        //withdrawBtn.setEnabled(false);
        withdrawBtn.addActionListener(new Buttonlistener());
    
        frame.add(welcome);
        frame.add(transferMoney);
        frame.add(removeAccountBtn);
        frame.add(depositBtn);
        frame.add(withdrawBtn);
        frame.add(Balance);

        frame.setSize(600,500);
        frame.setLayout(null);
        frame.setVisible(true);
    }

    private class Buttonlistener implements ActionListener{
    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == withdrawBtn){
            withdrawal withdrawlpg = new withdrawal();
            withdrawlpg.withdrawalpage();
            System.out.println("Withdraw");
        }
        else if (e.getSource() == depositBtn)
        {
            deposit depositpg = new deposit();
            depositpg.depositpage();
            System.out.println("deposit");
        }
        else if (e.getSource() == removeAccountBtn){
            deleteAccount deletepg = new deleteAccount();
            deletepg.deletepage();
            System.out.println("remove");
        }

        else if (e.getSource() == transferMoney){
            transferAccount transferpg = new transferAccount();
            transferpg.transferpage();
            System.out.println("transfer");
        }

    }
    
}



}
        
  