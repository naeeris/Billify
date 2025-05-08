from django.contrib import admin
from .models import Invoice, CreditNote

# Register your models here.
@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('invoice_number', 'invoice_reg_date', 'invoice_date', 'total_amount')
    search_fields = ('invoice_number',)
    list_filter = ('invoice_reg_date', 'invoice_date')
    ordering = ('-invoice_date',)

@admin.register(CreditNote)
class CreditNoteAdmin(admin.ModelAdmin):
    list_display = ('credit_note_number', 'credit_note_reg_date', 'credit_note_date', 'total_amount')
    search_fields = ('credit_note_number',)
    list_filter = ('credit_note_reg_date', 'credit_note_date')
    ordering = ('-credit_note_date',)
