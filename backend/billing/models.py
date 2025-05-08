from django.db import models

# Modelo Invoice
class Invoice(models.Model):
    invoice_number = models.CharField(max_length=255, unique=True)
    invoice_reg_date = models.DateField()
    invoice_date = models.DateField()
    '''
    invoice_supplier = models.ForeignKey(
        Supplier,
        max_length=255
        on_delete=models.PROTECT,
        related_name='invoices',
        verbose_name='Supplier',
    )
    '''
    registered_by = models.ForeignKey(
        'auth.User',
        on_delete=models.PROTECT,
        related_name='invoices',
        verbose_name='Registered By',
    )
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Invoice {self.invoice_number} - {self.invoice_supplier}"
    
    class Meta:
        verbose_name = "Invoice"
        verbose_name_plural = "Invoices"
        ordering = ['-invoice_date']

# Modelo CreditNote
class CreditNote(models.Model):
    credit_note_number = models.CharField(max_length=255, unique=True)
    credit_note_reg_date = models.DateField()
    credit_note_date = models.DateField()
    '''
    credit_note_supplier = models.ForeignKey(
        Supplier,
        max_length=255,
        on_delete=models.PROTECT,
        related_name='credit_notes',
        verbose_name='Supplier',
    )
    '''
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    registered_by = models.ForeignKey(
        'auth.User',
        on_delete=models.PROTECT,
        related_name='credit_notes',
        verbose_name='Registered By',
    )

    def __str__(self):
        return f"Credit Note {self.credit_note_number} - {self.credit_note_supplier}"
    
    class Meta:
        verbose_name = "Credit Note"
        verbose_name_plural = "Credit Notes"
        ordering = ['-credit_note_date']