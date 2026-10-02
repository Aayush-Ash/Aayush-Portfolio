import React, { useState } from 'react';
import type { ArchitectureNode } from '../types/project';
import { sounds } from '../audio/soundEffects';
import { CheckCircle2, ArrowRight, Layers, Sparkles, Terminal } from 'lucide-react';

interface Props {
  nodes: ArchitectureNode[];
  systemTitle?: string;
}

export const ArchitectureViewer: React.FC<Props> = ({ nodes, systemTitle }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[1]?.id || nodes[0]?.id);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const handleSelectNode = (id: string) => {
    sounds.playClick();
    setSelectedNodeId(id);
  };

  return (
    <div className="arch-viewer-root">
      <div className="arch-header">
        <div className="arch-header-badge">
          <Layers size={14} className="text-cyan" />
          <span>INTERACTIVE DAG ARCHITECTURE PIPELINE</span>
        </div>
        <p className="arch-hint">Click individual pipeline nodes below to inspect internal execution logic, tools, and data contracts.</p>
      </div>

      {/* Nodes Flow Bar */}
      <div className="arch-flow-wrapper">
        <div className="arch-flow-line" />
        <div className="arch-nodes-grid">
          {nodes.map((node, index) => {
            const isSelected = node.id === selectedNodeId;
            return (
              <React.Fragment key={node.id}>
                <button
                  type="button"
                  className={`arch-node-card ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectNode(node.id)}
                >
                  <div className="arch-node-step">0{index + 1}</div>
                  <div className="arch-node-name">{node.name}</div>
                  <div className="arch-node-role">{node.role}</div>
                  {isSelected && <div className="arch-node-pulse" />}
                </button>
                {index < nodes.length - 1 && (
                  <div className="arch-connector">
                    <ArrowRight size={14} className="arch-arrow-icon" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Deep-Dive Inspection Panel */}
      {selectedNode && (
        <div className="arch-detail-card">
          <div className="arch-detail-header">
            <div>
              <span className="arch-detail-sub">{selectedNode.role}</span>
              <h3 className="arch-detail-title">{selectedNode.name}</h3>
            </div>
            <div className="arch-detail-badge">
              <Sparkles size={13} />
              <span>ACTIVE COMPONENT</span>
            </div>
          </div>

          <p className="arch-detail-desc">{selectedNode.description}</p>

          <div className="arch-grid-two">
            {selectedNode.subTasks && selectedNode.subTasks.length > 0 && (
              <div className="arch-subtask-box">
                <div className="arch-box-title">
                  <CheckCircle2 size={13} className="text-emerald" />
                  <span>INTERNAL EXECUTION SUB-TASKS</span>
                </div>
                <ul className="arch-box-list">
                  {selectedNode.subTasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedNode.tech && selectedNode.tech.length > 0 && (
              <div className="arch-subtask-box">
                <div className="arch-box-title">
                  <Terminal size={13} className="text-cyan" />
                  <span>IMPLEMENTATION STACK</span>
                </div>
                <div className="arch-tech-tags">
                  {selectedNode.tech.map((t, i) => (
                    <span key={i} className="arch-tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {(selectedNode.inputs || selectedNode.outputs) && (
            <div className="arch-io-row">
              {selectedNode.inputs && (
                <div className="arch-io-col">
                  <span className="arch-io-label">INPUT CONTRACT:</span>
                  <span className="arch-io-val">{selectedNode.inputs.join(', ')}</span>
                </div>
              )}
              {selectedNode.outputs && (
                <div className="arch-io-col">
                  <span className="arch-io-label">OUTPUT CONTRACT:</span>
                  <span className="arch-io-val text-cyan">{selectedNode.outputs.join(', ')}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
