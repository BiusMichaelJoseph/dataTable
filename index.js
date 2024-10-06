document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const contentDisplay = document.getElementById('contentDisplay');

    // Fetch the JSON data for the navigation menu
    fetch('navigation_menu.json')
        .then(response => response.json())
        .then(data => {
            // Create the menu structure
            data.rootDetails.forEach(root => {
                const rootElement = document.createElement('div');
                rootElement.classList.add('root');
                rootElement.textContent = root.root;

                const linksContainer = document.createElement('ul');
                linksContainer.classList.add('link-container'); // Add a class for styling
                linksContainer.style.display = 'none'; // Initially hidden
                // linksContainer.style.position = 'absolute'; // To make it appear next to the root
                linksContainer.style.top = '0'; // Align it at the top
                linksContainer.style.left = '250px'; // Adjust based on sidebar width to make it float to the right

                root.linkDetails.forEach(link => {
                    const linkElement = document.createElement('li');
                    linkElement.classList.add('link');
                    linkElement.textContent = link.name;

                    // Add event listener for link clicks
                    linkElement.addEventListener('click', () => {
                        handleLinkClick(link.child);
                    });

                    linksContainer.appendChild(linkElement);
                });

                rootElement.appendChild(linksContainer);
                sidebar.appendChild(rootElement);

                // Show child links on mouseover
                let inSubMenu = false;

                const mouseMove = (e) => {
                    console.log(e.pageX, e.pageY);
                    let digit = e.pageY - 50;

                    if (!inSubMenu) {
                        linksContainer.style.top = digit.toString() + 'px';
                    }

                    let boxHeight = linksContainer.offsetHeight;
                    let windowHeight = window.innerHeight;

                    // Prevent linksContainer from going beyond the viewport bottom
                    if (windowHeight - boxHeight < digit) {
                        linksContainer.style.top = (windowHeight - boxHeight - 10) + 'px';
                    }
                };

                // Attach the event listeners only once, outside the mouseMove function
                linksContainer.addEventListener('mouseenter', () => {
                    inSubMenu = true;
                });

                linksContainer.addEventListener('mouseleave', () => {
                    inSubMenu = false;
                });

                // Attach the mouseMove event
                window.addEventListener('mousemove', mouseMove);

                    // linksContainer.style.left = e.pageX.toString() + 'px'
                
                rootElement.addEventListener('mouseenter', () => {
                    linksContainer.style.display = 'block'; // Show the child menu
                });
                rootElement.addEventListener('mousemove', mouseMove)

                // Hide child links on mouseleave
                rootElement.addEventListener('mouseleave', () => {
                    linksContainer.style.display = 'none'; // Hide the child menu
                });
            });
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });

    // Function to handle link clicks and update the main content area
    function handleLinkClick(linkChild) {
        contentDisplay.innerHTML = `<h3>${linkChild} Selected</h3>`;
    }
});
