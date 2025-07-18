import React from 'react';
import { X } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'; // Assuming Shadcn UI is set up with components in this path

interface Tab {
  path: string;
  name: string;
  isActive: boolean;
  isDirty?: boolean;
}

interface EditorBreadcrumbProps {
  path: string;
  isDirty: boolean;
  onClose: () => void;
}

export const EditorBreadcrumb: React.FC<EditorBreadcrumbProps> = ({
  path,
  isDirty,
  onClose
}) => {
  const parts = path.split('/').filter(part => part.trim() !== '');
  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.tsx')) return '⚛️';
    if (fileName.endsWith('.ts')) return '📘';
    if (fileName.endsWith('.css')) return '🎨';
    return '📄';
  };

  return (
    <Breadcrumb className="bg-vscode-tab border-b border-neutral-800 overflow-x-auto p-2">
      <BreadcrumbList>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem
              className={`${
                index === parts.length - 1
                  ? 'bg-vscode-tab-active text-vscode-text'
                  : 'text-vscode-text-muted hover:bg-vscode-hover'
              } px-2 py-1 rounded`}
            >
              {index === parts.length - 1 ? (
                <div className="flex items-center">
                  <span className="mr-2 text-xs">{getFileIcon(part)}</span>
                  <span className="text-sm truncate">{part}</span>
                  {isDirty && (
                    <span className="ml-1 w-2 h-2 bg-white rounded-full inline-block" />
                  )}
                  <button
                    className="ml-2 p-1 hover:bg-vscode-hover rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <span className="text-sm">{part}</span>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};


// import React from 'react';
// import { X } from 'lucide-react';

// interface Tab {
//   path: string;
//   name: string;
//   isActive: boolean;
//   isDirty?: boolean;
// }

// interface EditorTabsProps {
//   tabs: Tab[];
//   onTabClick: (path: string) => void;
//   onTabClose: (path: string) => void;
//   activeTab: string | null;
// }

// export const EditorTabs: React.FC<EditorTabsProps> = ({
//   tabs,
//   onTabClick,
//   onTabClose,
//   activeTab
// }) => {
//   const getFileIcon = (fileName: string) => {
//     if (fileName.endsWith('.tsx')) return '⚛️';
//     if (fileName.endsWith('.ts')) return '📘';
//     if (fileName.endsWith('.css')) return '🎨';
//     return '📄';
//   };

//   return (
//     <div className="flex bg-vscode-tab border-b border-neutral-800 overflow-x-auto">
//       {tabs.map((tab) => (
//         <div
//           key={tab.path}
//           className={`flex items-center px-3 py-2 border-r border-neutral-800 cursor-pointer min-w-0 ${
//             tab.path === activeTab
//               ? 'bg-vscode-tab-active text-vscode-text'
//               : 'bg-vscode-tab text-vscode-text-muted hover:bg-vscode-hover'
//           }`}
//           onClick={() => onTabClick(tab.path)}
//         >
//           <span className="mr-2 text-xs">{getFileIcon(tab.name)}</span>
//           <span className="text-sm truncate">{tab.name}</span>
//           {tab.isDirty && (
//             <span className="ml-1 w-2 h-2 bg-white rounded-full"></span>
//           )}
//           <button
//             className="ml-2 p-1 hover:bg-vscode-hover rounded"
//             onClick={(e) => {
//               e.stopPropagation();
//               onTabClose(tab.path);
//             }}
//           >
//             <X className="w-3 h-3" />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };