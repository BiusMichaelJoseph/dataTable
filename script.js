$(document).ready(function() {
    // Replace 'data.json' with the path to your JSON file
    $.getJSON('data.json', function(data) {
        $('#example').DataTable({
            data: data,
            columns: [
                { data: 'DATE' },
                { data: 'CUSTOMERCODE' },
                { data: 'TRANSACTIONCODE' },
                { data: 'NARRATION' },
                { data: 'DEBIT' },
                { data: 'CREDIT' }
                { data: 'BALANCE' }
            ]
        });
    });
});
