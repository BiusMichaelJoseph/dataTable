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
            ]
        });
    });
});
