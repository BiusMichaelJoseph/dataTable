$(document).ready(function() {
    // Function to dynamically generate the navigation menu
    function loadMenu(navData) {
        if (navData.validData) {
            const menuContainer = $('#dynamicMenu');

            // Loop through root details (e.g., "Sales")
            navData.rootDetails.forEach(rootDetail => {
                // Create a header for each root
                const rootHeader = $('<li>').text(rootDetail.root);
                menuContainer.append(rootHeader);

                // Loop through link details (e.g., Sale, Invoice, etc.)
                rootDetail.linkDetails.forEach(linkDetail => {
                    const linkItem = $('<li>')
                        .attr('id', linkDetail.child)
                        .text(linkDetail.name)
                        .addClass('menuItem'); // Add a class for styling

                    // Append the link to the menu container
                    menuContainer.append(linkItem);
                });
            });

            // Handle menu item click events
            $('.menuItem').on('click', function() {
                const itemName = $(this).text();
                $('#contentDisplay').html('<h3>' + itemName + ' Selected</h3>');
            });
        }
    }

    // Fetch the JSON data from the external file
    $.getJSON('navigation_menu.json', function(navData) {
        // Call the function to load the menu with fetched data
        loadMenu(navData);
    }).fail(function() {
        console.error('Error loading navigation menu data.');
        $('#contentDisplay').html('<p>Failed to load navigation menu.</p>');
    });
});
