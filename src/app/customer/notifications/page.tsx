'use client';

import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  XCircle, 
  Bell, 
  MoreVertical 
} from 'lucide-react';

export default function CustomerNotifications() {
  const [expandedNotifications, setExpandedNotifications] = React.useState<Record<number, boolean>>({});

  const notifications = [
    {
      id: 1,
      title: 'Booking Confirmed',
      description: 'Your booking for Ford F-650 Box Truck has been confirmed.',
      time: 'Feb 15, 10:30 AM',
      type: 'success',
      unread: true,
    },
    {
      id: 2,
      title: 'Payment Processed',
      description: 'Payment of $1,323 has been successfully processed.',
      time: 'Feb 14, 02:00 PM',
      type: 'success',
      unread: true,
    },
    {
      id: 3,
      title: 'Rental Ending Soon',
      description: 'Your rental for CAT 320 Excavator ends in 2 days.',
      time: 'Feb 13, 09:00 AM',
      type: 'warning',
      unread: false,
    },
    {
      id: 4,
      title: 'Maintenance Alert',
      description: 'Scheduled maintenance for Freightliner M2 106 is due.',
      time: 'Feb 12, 04:00 PM',
      type: 'info',
      unread: false,
    },
    {
      id: 5,
      title: 'New Rental Request',
      description: 'Mike Davis has requested to rent Kenworth T680 Semi.',
      time: 'Feb 14, 11:30 AM',
      type: 'info',
      unread: true,
    },
    {
      id: 6,
      title: 'GPS Alert',
      description: 'Ford F-650 Box Truck has left the designated area.',
      time: 'Feb 15, 08:45 AM',
      type: 'error',
      unread: true,
    },
  ];

  const getIconBox = (type: string) => {
    switch (type) {
      case 'success':
        return (
          <div className="w-10 h-10 md:w-11 md:h-11 bg-[#22C55E]/10 rounded-xl border border-white/5 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
          </div>
        );
      case 'warning':
        return (
          <div className="w-10 h-10 md:w-11 md:h-11 bg-yellow-500/10 rounded-xl border border-white/5 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
        );
      case 'error':
        return (
          <div className="w-10 h-10 md:w-11 md:h-11 bg-red-500/10 rounded-xl border border-white/5 flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5 text-red-500" />
          </div>
        );
      case 'info':
        return (
          <div className="w-10 h-10 md:w-11 md:h-11 bg-blue-400/10 rounded-xl border border-white/5 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5 text-blue-400" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 md:w-11 md:h-11 bg-[#18C3BB]/10 rounded-xl border border-white/5 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5 text-gray-400" />
          </div>
        );
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="w-[98%] lg:w-[96%] 2xl:w-[92%] max-w-[2400px] mx-auto space-y-8 bg-[#001C2F] font-inter">
      {/* Header Section */}
      <div className="flex justify-between items-center px-1">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-space">Notifications</h1>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm md:text-base">{unreadCount} unread</span>
            {unreadCount > 0 && (
              <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] shrink-0 animate-pulse"></span>
            )}
          </div>
        </div>
        <button className="text-[#22C55E] hover:text-[#1eb050] text-sm font-bold transition-colors hover:underline">
          Mark all read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => {
          const isExpanded = expandedNotifications[notification.id] || false;
          return (
            <div 
              key={notification.id} 
              className="bg-[#0B2337] border border-[#2A2F38] p-4 md:p-5 rounded-[16px] flex items-center justify-between gap-4 hover:border-white/10 transition-all group relative overflow-hidden"
            >
              <div 
                className="flex items-center gap-4 min-w-0 cursor-pointer select-none w-full"
                onClick={() => setExpandedNotifications(prev => ({ ...prev, [notification.id]: !prev[notification.id] }))}
                title="Click/Tap to expand description"
              >
                {/* Icon Container */}
                {getIconBox(notification.type)}

                {/* Info */}
                <div className="space-y-0.5 min-w-0 flex-1 pr-2 md:pr-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-white font-bold text-sm md:text-base font-space truncate block" title={notification.title}>
                      {notification.title}
                    </h3>
                    {notification.unread && (
                      <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] shrink-0 animate-pulse" />
                    )}
                  </div>
                  
                  <div className="relative group/tooltip min-w-0">
                    <p className={`text-gray-400 text-xs md:text-sm font-medium block leading-relaxed ${
                      isExpanded ? 'whitespace-normal' : 'truncate max-w-[150px] xs:max-w-[200px] sm:max-w-[350px] md:max-w-none'
                    }`}>
                      {notification.description}
                    </p>
                    {!isExpanded && (
                      <div className="absolute left-0 bottom-full mb-1.5 hidden group-hover/tooltip:block bg-[#050E1B] border border-white/10 text-white text-xs px-3 py-1.5 rounded-lg shadow-2xl whitespace-nowrap z-50 pointer-events-none transition-all duration-150">
                        {notification.description} (Tap to expand)
                      </div>
                    )}
                  </div>

                  <p className="text-gray-500 text-[10px] md:text-xs font-bold font-mono">
                    {notification.time}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center shrink-0">
                <button className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 active:scale-95">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
