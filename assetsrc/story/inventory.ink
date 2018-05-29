LIST inventoryItems = WaterbottleFull, WaterbottleHalf, WaterbottleEmpty, Rope, CarvedToy, Torch, Food, SleepingBag

VAR currentInventory = (WaterbottleFull, Rope, CarvedToy, Torch)

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