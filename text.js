document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const contentDisplay = document.getElementById('contentDisplay');

    // Fetch the JSON data for the navigation menu
    fetch('navigation_menu.json')
        .then(response => response.json())
        .then(data => {
            // Create the menu structure
            data.rootDetails.forEach(root => {
                const rootElement = createRootElement(root);
                sidebar.appendChild(rootElement);
            });
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });

    // Function to create a root element with child links
    function createRootElement(root) {
        const rootElement = document.createElement('div');
        rootElement.classList.add('root');
        rootElement.textContent = root.root;

        const linksContainer = document.createElement('ul');
        linksContainer.classList.add('link-container');
        linksContainer.style.display = 'none'; // Initially hidden

        root.linkDetails.forEach(link => {
            const linkElement = document.createElement('li');
            linkElement.classList.add('link');
            linkElement.textContent = link.name;
            linkElement.addEventListener('click', () => handleLinkClick(link.child));
            linksContainer.appendChild(linkElement);
        });

        rootElement.appendChild(linksContainer);
        setupEventListeners(rootElement, linksContainer);
        return rootElement;
    }

    // Function to setup event listeners for root and links
    function setupEventListeners(rootElement, linksContainer) {
        let inSubMenu = false;

        rootElement.addEventListener('mouseenter', () => {
            linksContainer.style.display = 'block'; // Show child menu
        });

        rootElement.addEventListener('mouseleave', () => {
            linksContainer.style.display = 'none'; // Hide child menu
        });

        linksContainer.addEventListener('mouseenter', () => {
            inSubMenu = true; // Keep the submenu open
        });

        linksContainer.addEventListener('mouseleave', () => {
            inSubMenu = false; // Allow the submenu to close
            linksContainer.style.display = 'none'; // Hide on leave
        });

        // Positioning the child menu with mouse movements
        const mouseMove = (e) => {
            const offsetY = e.pageY - 50;
            linksContainer.style.top = Math.max(0, Math.min(offsetY, window.innerHeight - linksContainer.offsetHeight - 10)) + 'px';
            linksContainer.style.left = '200px'; // Keep it fixed next to the sidebar
        };

        // Attach mousemove listener only to the root element
        rootElement.addEventListener('mousemove', mouseMove);
    }

    // Function to handle link clicks and update the main content area
    function handleLinkClick(linkChild) {
        contentDisplay.innerHTML = `<h3>${linkChild} Selected</h3>`;
    }
});
