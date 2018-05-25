LIST inventoryItems = Waterbottle, Rope

VAR currentInventory = (Waterbottle, Rope)

=== function check_inventory(itemName)
{
    - currentInventory ? itemName:
        ~ return true
    - else:
        ~ return false
}

=== function remove_inventory(itemName)
{
    - check_inventory(itemName):
        ~ currentInventory -= itemName
}

=== function add_inventory(itemName)
{
    - !check_inventory(itemName):
        ~ currentInventory += itemName
}