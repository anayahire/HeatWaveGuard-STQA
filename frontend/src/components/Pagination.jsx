import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, totalRecords, perPage, onPageChange, onPerPageChange }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid var(--border-color)',
      marginTop: '1rem'
    }}>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Showing page <strong style={{ color: 'white' }}>{page}</strong> of <strong style={{ color: 'white' }}>{totalPages}</strong> ({totalRecords} total records)
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>Per page:</span>
          <select
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="glass-input"
            style={{ padding: '0.35rem 0.6rem', width: 'auto' }}
          >
            <option value={10} style={{ background: '#0f172a' }}>10</option>
            <option value={20} style={{ background: '#0f172a' }}>20</option>
            <option value={50} style={{ background: '#0f172a' }}>50</option>
            <option value={100} style={{ background: '#0f172a' }}>100</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: page <= 1 ? 'transparent' : 'rgba(30, 41, 59, 0.8)',
              color: page <= 1 ? 'var(--text-dim)' : 'white',
              cursor: page <= 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              fontSize: '0.85rem'
            }}
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: page >= totalPages ? 'transparent' : 'rgba(30, 41, 59, 0.8)',
              color: page >= totalPages ? 'var(--text-dim)' : 'white',
              cursor: page >= totalPages ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              fontSize: '0.85rem'
            }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
