fetch('config.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    // Validate config structure
    if (!data.role || !Array.isArray(data.nodes)) {
      throw new Error("Invalid config.json structure");
    }

    document.getElementById('role-title').innerText = data.role;

    const container = document.getElementById('mindmap-container');
    const companyListEl = document.getElementById('company-list');
    const allTools = data.nodes;
    const companySet = new Set();

    // Helper: normalize strings (e.g., toLowerCase with trim)
    const normalize = str => str.trim().toLowerCase();

    // Build nodes and gather unique companies
    allTools.forEach(node => {
      const tool = document.createElement('div');
      tool.className = 'tool';
      tool.textContent = node.name;
      tool.style.backgroundColor = node.color || '#ffd700';
      tool.setAttribute('data-usedat', node.usedAt.map(c=>c.toLowerCase().trim()).join(' ')); // separate by pipe for easier parsing
      container.appendChild(tool);

      node.usedAt.forEach(company => {
        if (company !== "All") companySet.add(normalize(company));
      });
    });

    // Create company buttons
    const uniqueCompanies = [...companySet];
    uniqueCompanies.sort().forEach(company => {
      const btn = document.createElement('span');
      btn.className = 'company';
      btn.textContent = company.replace(/\b\w/g, l => l.toUpperCase()); // Capitalize for display
      btn.dataset.company = normalize(company);
      companyListEl.appendChild(btn);
    });

    // Hover logic
    document.querySelectorAll('.company').forEach(companyEl => {
      companyEl.addEventListener('mouseover', () => {
        const selectedCompany = companyEl.dataset.company;

        document.querySelectorAll('.tool').forEach(tool => {
          const usedAt = tool.dataset.usedat.toLowerCase().split(' ');

          const isRelevant =
            usedAt.includes(selectedCompany) ||
            usedAt.includes('all') ||
            usedAt.includes('personal projects');

          if (isRelevant) {
            tool.classList.remove('dimmed');
            tool.classList.add('highlight');
          } else {
            tool.classList.remove('highlight');
            tool.classList.add('dimmed');
          }
        });
      });

      companyEl.addEventListener('mouseleave', () => {
        document.querySelectorAll('.tool').forEach(tool => {
          tool.classList.remove('dimmed', 'highlight');
        });
      });
    });
  })
  .catch(error => {
    console.error('Error loading config:', error);

    const errorBox = document.createElement('div');
    errorBox.style.color = 'red';
    errorBox.style.fontWeight = 'bold';
    errorBox.textContent = '⚠️ Failed to load mind map configuration. Please check console or config.json.';
    document.body.prepend(errorBox);
  });
