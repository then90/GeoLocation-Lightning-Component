public class AccountsData {
    @AuraEnabled
    public static List<Account> findNearbyAccounts(Decimal latitude, decimal longitude){
        List<Account> accountList = [Select Id,Name,BillingLatitude,BillingLongitude From Account Where Distance(BillingAddress,GeoLocation(:latitude, :longitude),'km') <10];
        return accountList;
    }
}