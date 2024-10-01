$(document).ready(function() {
    $.getJSON('Customer Statement.json', function(data) {
        $('#example').DataTable({
            data: data,
            columns: [
                { data: 'DATE' },
                { data: 'CUSTOMERCODE' },
                { data: 'TRANSACTIONCODE' },
                { data: 'NARRATION' },
                { data: 'DEBIT' },
                { data: 'CREDIT' },
                { data: 'BALANCE' }
            ],
            dom: 'Bfrtip',  // Show the buttons
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: 'Data Export',
                    text: 'Export as Excel'
                },
                {
                    extend: 'pdfHtml5',
                    title: 'Data Export',
                    text: 'Export as PDF'
                }
            ]
        });
    });
});
