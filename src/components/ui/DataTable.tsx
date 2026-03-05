'use client';

import React from 'react';

interface DataTableProps {
  headers: string[];
  children: React.ReactNode;
}

export function DataTable({ headers, children }: DataTableProps) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
