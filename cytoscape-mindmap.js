fetch('graph_config.json')
  .then(response => response.json())
  .then(data => {
    // Convert nodes and edges to Cytoscape format
    const cyNodes = data.nodes.map(node => ({
      data: {
        id: node.id,
        label: node.id,
        type: node.type
      },
      classes: node.type
    }));
    const cyEdges = data.edges.map(edge => ({
      data: { source: edge.from, target: edge.to }
    }));

    // Make cy globally accessible for control buttons
    window.cy = cytoscape({
      container: document.getElementById('cy-mindmap'),
      elements: [...cyNodes, ...cyEdges],
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-family': 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif',
            'font-size': 16,
            'background-color': '#ffffff',
            'color': '#2c3e50',
            'width': 100,
            'height': 100,
            'border-width': 2,
            'border-color': '#bdc3c7',
            'text-outline-width': 0,
            'text-wrap': 'wrap',
            'text-max-width': 120,
            'shadow-blur': 4,
            'shadow-opacity': 0.1,
            'shadow-offset-x': 1,
            'shadow-offset-y': 1,
            'transition-property': 'background-color, border-color',
            'transition-duration': '0.3s'
          }
        },
        {
          selector: 'node.center',
          style: {
            'background-color': '#2563eb',
            'border-color': '#1d4ed8',
            'color': '#ffffff',
            'font-size': 28,
            'width': 180,
            'height': 180,
            'font-weight': 'bold',
            'shape': 'ellipse',
            'z-index': 100,
            'shadow-blur': 8,
            'shadow-opacity': 0.2,
            'text-outline-width': 1,
            'text-outline-color': '#1d4ed8',
            'text-outline-opacity': 0.5
          }
        },
        {
          selector: 'node.branch',
          style: {
            'background-color': '#3498db',
            'border-color': '#2980b9',
            'color': '#ffffff',
            'font-size': 18,
            'width': 140,
            'height': 140,
            'font-weight': 'bold',
            'shape': 'round-rectangle',
            'z-index': 50,
            'shadow-blur': 6,
            'shadow-opacity': 0.15
          }
        },
        {
          selector: 'node.sub-branch',
          style: {
            'background-color': '#10b981',
            'border-color': '#059669',
            'color': '#ffffff',
            'font-size': 16,
            'width': 120,
            'height': 120,
            'font-weight': 'bold',
            'shape': 'round-rectangle',
            'z-index': 40,
            'shadow-blur': 5,
            'shadow-opacity': 0.12
          }
        },
        {
          selector: 'node.category',
          style: {
            'background-color': '#8b5cf6',
            'border-color': '#7c3aed',
            'color': '#ffffff',
            'font-size': 15,
            'width': 110,
            'height': 110,
            'font-weight': '600',
            'shape': 'round-rectangle',
            'z-index': 30,
            'shadow-blur': 4,
            'shadow-opacity': 0.1
          }
        },
        {
          selector: 'node.company',
          style: {
            'background-color': '#10b981',
            'border-color': '#059669',
            'color': '#ffffff',
            'font-size': 16,
            'width': 110,
            'height': 110,
            'font-weight': '600',
            'shape': 'round-rectangle',
            'z-index': 25
          }
        },
        {
          selector: 'node.skill',
          style: {
            'background-color': '#f59e0b',
            'border-color': '#d97706',
            'color': '#ffffff',
            'font-size': 15,
            'width': 100,
            'height': 100,
            'font-weight': '500',
            'shape': 'ellipse',
            'z-index': 20
          }
        },
        {
          selector: 'node.tool',
          style: {
            'background-color': '#f59e0b',
            'border-color': '#d97706',
            'color': '#ffffff',
            'font-size': 14,
            'width': 90,
            'height': 90,
            'font-weight': '500',
            'shape': 'ellipse',
            'z-index': 15
          }
        },
        {
          selector: 'node.framework',
          style: {
            'background-color': '#f59e0b',
            'border-color': '#d97706',
            'color': '#ffffff',
            'font-size': 14,
            'width': 90,
            'height': 90,
            'font-weight': '500',
            'shape': 'round-rectangle',
            'z-index': 15
          }
        },
        {
          selector: 'node.language',
          style: {
            'background-color': '#1f2937',
            'border-color': '#111827',
            'color': '#ffffff',
            'font-size': 15,
            'width': 95,
            'height': 95,
            'font-weight': '600',
            'shape': 'hexagon',
            'z-index': 20
          }
        },
        {
          selector: 'node.devops, node.perf, node.management, node.report, node.security, node.database',
          style: {
            'background-color': '#64748b',
            'border-color': '#475569',
            'color': '#ffffff',
            'font-size': 13,
            'width': 85,
            'height': 85,
            'font-weight': '500',
            'shape': 'ellipse',
            'z-index': 10
          }
        },
        {
          selector: 'node.detail',
          style: {
            'background-color': '#64748b',
            'border-color': '#475569',
            'color': '#ffffff',
            'font-size': 12,
            'width': 80,
            'height': 80,
            'font-weight': '500',
            'shape': 'ellipse',
            'z-index': 5
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#e2e8f0',
            'curve-style': 'straight',
            'target-arrow-shape': 'none',
            'opacity': 0.8,
            'transition-property': 'line-color, opacity, width',
            'transition-duration': '0.3s'
          }
        },
        {
          selector: 'node:hover',
          style: {
            'border-width': 4,
            'shadow-blur': 12,
            'shadow-opacity': 0.3,
            'z-index': 9999
          }
        },
        {
          selector: '.highlighted',
          style: {
            'background-color': '#fbbf24',
            'border-color': '#f59e0b',
            'color': '#1f2937',
            'font-weight': 'bold',
            'z-index': 9999,
            'shadow-blur': 12,
            'shadow-opacity': 0.4,
            'border-width': 4
          }
        },
        {
          selector: '.connected-edge',
          style: {
            'line-color': '#2563eb',
            'width': 5,
            'opacity': 1,
            'z-index': 100
          }
        },
        {
          selector: '.dimmed',
          style: {
            'opacity': 0.3,
            'shadow-opacity': 0.05
          }
        }
      ],
      layout: {
        name: 'breadthfirst',
        directed: true,
        animate: true,
        animationDuration: 1000,
        animationEasing: 'ease-out-cubic',
        fit: true,
        padding: 30,
        spacingFactor: 1.0,
        nodeDimensionsIncludeLabels: true,
        roots: '#SDET',
        circle: false,
        grid: true,
        avoidOverlap: true,
        maximal: true,
        ready: function() {},
        stop: function() {}
      },
      userZoomingEnabled: true,
      userPanningEnabled: true,
      boxSelectionEnabled: false,
      autoungrabify: false,
      wheelSensitivity: 0.3,
      minZoom: 0.4,
      maxZoom: 3
    });

    // Enhanced highlighting with smooth animations
    function highlightConnected(nodeId) {
      window.cy.batch(() => {
        window.cy.elements().removeClass('highlighted dimmed connected-edge');
        const node = window.cy.getElementById(nodeId);
        const connectedNodes = node.closedNeighborhood().nodes();
        const connectedEdges = node.connectedEdges();
        
        // Dim non-connected elements
        window.cy.elements().not(connectedNodes).not(connectedEdges).addClass('dimmed');
        
        // Highlight connected elements
        connectedNodes.addClass('highlighted');
        connectedEdges.addClass('connected-edge');
      });
    }
    
    function clearHighlight() {
      window.cy.batch(() => {
        window.cy.elements().removeClass('highlighted dimmed connected-edge');
      });
    }

    // Enhanced event listeners with debouncing
    let hoverTimeout;
    
    window.cy.on('mouseover', 'node', function(evt) {
      clearTimeout(hoverTimeout);
      highlightConnected(evt.target.id());
    });
    
    window.cy.on('mouseout', 'node', function(evt) {
      hoverTimeout = setTimeout(clearHighlight, 150);
    });
    
    // Touch support for mobile devices
    window.cy.on('tap', 'node', function(evt) {
      highlightConnected(evt.target.id());
    });
    
    window.cy.on('tap', function(evt) {
      if (evt.target === window.cy) {
        clearHighlight();
      }
    });

    // Auto-fit after layout completes
    window.cy.on('layoutstop', function() {
      setTimeout(() => {
        window.cy.fit(null, 40);
        window.cy.center();
      }, 200);
    });

    // Add zoom controls and other UI enhancements
    window.cy.ready(function() {
      // Add a subtle fade-in animation
      window.cy.nodes().style('opacity', 0);
      window.cy.edges().style('opacity', 0);
      
      window.cy.nodes().animate({
        style: { 'opacity': 1 }
      }, {
        duration: 1200,
        easing: 'ease-out-cubic'
      });
      
      window.cy.edges().delay(400).animate({
        style: { 'opacity': 0.8 }
      }, {
        duration: 800,
        easing: 'ease-out-cubic'
      });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        clearHighlight();
      } else if (e.key === 'f' || e.key === 'F') {
        window.cy.fit(null, 40);
      } else if (e.key === 'r' || e.key === 'R') {
        window.cy.reset();
        window.cy.fit(null, 40);
      }
    });

    // Update node statistics
    const updateStats = () => {
      const nodeCount = window.cy.nodes().length;
      const edgeCount = window.cy.edges().length;
      const statsElement = document.getElementById('node-count');
      if (statsElement) {
        statsElement.textContent = `${nodeCount} nodes • ${edgeCount} connections`;
      }
    };

    // Update stats after initialization
    window.cy.ready(updateStats);

  })
  .catch(error => {
    console.error('Error loading graph config:', error);
    const container = document.getElementById('cy-mindmap');
    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; 
                  font-family: 'Segoe UI', sans-serif; color: #e74c3c; font-size: 18px;">
        <div style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
          <div>Failed to load mindmap data</div>
          <div style="font-size: 14px; color: #7f8c8d; margin-top: 10px;">
            Please check the graph_config.json file
          </div>
        </div>
      </div>
    `;
  }); 