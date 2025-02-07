import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calculator } from 'lucide-react';
import { useReceiptCalculation } from '../../hooks/useReceiptCalculation';
import { ReceiptCalculationProps } from '../../types/receipt';

export const ReceiptCalculation: React.FC<ReceiptCalculationProps> = ({
  clientId
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const data = useReceiptCalculation(clientId);

  const formatAmount = (amount: number): string => {
    return amount.toLocaleString() + ' ₸';
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-gray-400" />
          <span className="font-medium text-gray-900">Расчет по чекам</span>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      {isExpanded && (
        <div className="divide-y divide-gray-100">
          {/* Операционный расход */}
          <div className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Операционный расход</span>
              <span className="font-medium">{formatAmount(data.operationalExpense)}</span>
            </div>
          </div>
          
          {/* СИП панели */}
          <div className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Стены из СИП панелей (несущие)</span>
              <span className="font-medium">{formatAmount(data.sipWalls)}</span>
            </div>
          </div>
          
          {/* Утепление потолка */}
          <div className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Пенополистирол утепл потолка</span>
              <span className="font-medium">{formatAmount(data.ceilingInsulation)}</span>
            </div>
          </div>
          
          {/* Общий расход */}
          <div className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Общий расход + Работа + Склад</span>
              <span className="font-medium">{formatAmount(data.generalExpense)}</span>
            </div>
          </div>
          
          {/* Цена по договору */}
          <div className="p-4 bg-blue-50">
            <div className="flex justify-between items-center">
              <span className="font-medium text-blue-900">Цена по договору</span>
              <span className="font-bold text-blue-900">{formatAmount(data.contractPrice)}</span>
            </div>
          </div>
          
          {/* Итого общий расход */}
          <div className="p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Итого общий расход</span>
              <span className="font-bold text-gray-900">{formatAmount(data.totalExpense)}</span>
            </div>
          </div>
          
          {/* Итого чистая прибыль */}
          <div className="p-4 bg-red-50">
            <div className="flex justify-between items-center">
              <span className="font-medium text-red-900">Итого чистая прибыль</span>
              <span className="font-bold text-red-900">{formatAmount(data.netProfit)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};