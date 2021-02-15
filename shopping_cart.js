intent("(open|view) (the|) cart", p => {
    p.play({ command: 'open-cart' })
})

intent("close (the|) cart", p => {
    p.play({ command: 'close-cart' })
})

const itemNameSlot = "$(ITEM_NAME SIR ARTHUR CONAN DOYLE|THE SILENT PATIENT|GONE GIRL|THE LAST NAZI|THE VAULT OF VISHNU|INTO THE WATER|THE SHINING|DAREDREAMERS)"
const quantityContext = context(() => {
    follow("$(QUANTITY NUMBER)", p => {
        p.play({ command: 'add-item', payload: { quantity: p.QUANTITY.number, name: p.state.name } })
        p.resolve()
    })
    fallback("Please state how many items you want to add")
})
intent("add (the|) $(ITEM_NAME SIR ARTHUR CONAN DOYLE|THE SILENT PATIENT|GONE GIRL|THE LAST NAZI|THE VAULT OF VISHNU|INTO THE WATER|THE SHINING|DAREDREAMERS) (item|) to (the|) cart", p => {
    p.play(p.ITEM_NAME.value)
    p.play("How many would you like to add?")
    p.then(quantityContext, { state: { name: p.ITEM_NAME.value } })
})

intent("remove (the|) $(ITEM_NAME SIR ARTHUR CONAN DOYLE|THE SILENT PATIENT|GONE GIRL|THE LAST NAZI|THE VAULT OF VISHNU|INTO THE WATER|THE SHINING|DAREDREAMERS) (item|) from (the|) cart", p => {
    p.play({ command: 'remove-item', payload: { name: p.ITEM_NAME.value } })
})

intent("(checkout|purchase items)", p => {
    p.play({ command: 'purchase-items'})
})