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
            });
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });

    // Show child links on hover
    sidebar.addEventListener('mouseover', event => {
        const target = event.target;
        if (target.classList.contains('root')) {
            target.querySelectorAll('.link').forEach(link => {
                link.style.display = 'block';
            });
        }
    });

    sidebar.addEventListener('mouseleave',  event => {
        const target = event.target;
        if (!target.classList.contains('root')) {
            target.querySelectorAll('.link').forEach(link => {
                link.style.display = 'none';
            });
        }else{
            alert('else')
        }
    });

    // Function to handle link clicks and update the main content area
    function handleLinkClick(linkChild) {
        contentDisplay.innerHTML = `<h3>${linkChild} Selected</h3>`;
    }
});
