import { X, Printer, RefreshCw } from 'lucide-react';
import { Transaction } from '../types/transaction';

interface TransactionDetailModalProps {
  transaction: Transaction;
  onClose: () => void;
}

export function TransactionDetailModal({ transaction, onClose }: TransactionDetailModalProps) {
  const handlePrint = () => {
    // TODO: Implement print functionality
    console.log('Printing transaction:', transaction.id);
  };

  const handleRetry = () => {
    // TODO: Implement retry functionality
    console.log('Retrying transaction:', transaction.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'partially_paid':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Transaction ID</h4>
              <p className="mt-1 text-sm text-gray-900">{transaction.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Status</h4>
              <span className={`inline-flex mt-1 rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(transaction.payment.status)}`}>
                {transaction.payment.status.charAt(0).toUpperCase() + transaction.payment.status.slice(1)}
              </span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Patient Information</h4>
              <p className="mt-1 text-sm text-gray-900">{transaction.patientName}</p>
              <p className="text-sm text-gray-500">{transaction.patientId}</p>
              {transaction.patientContact && (
                <>
                  <p className="text-sm text-gray-500">{transaction.patientContact.email}</p>
                  <p className="text-sm text-gray-500">{transaction.patientContact.phone}</p>
                </>
              )}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Service Details</h4>
              <p className="mt-1 text-sm text-gray-900">{transaction.serviceDetails.description}</p>
              <p className="text-sm text-gray-500">Department: {transaction.serviceDetails.department}</p>
              <p className="text-sm text-gray-500">Code: {transaction.serviceDetails.serviceCode}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Financial Details</h4>
              <p className="mt-1 text-sm text-gray-900">
                Amount: {transaction.financial.currency} {transaction.financial.amount}
              </p>
              <p className="text-sm text-gray-500">Tax: {transaction.financial.currency} {transaction.financial.tax}</p>
              <p className="text-sm text-gray-500">Discount: {transaction.financial.currency} {transaction.financial.discount}</p>
              <p className="text-sm font-medium text-gray-900">
                Net Total: {transaction.financial.currency} {transaction.financial.netTotal}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Payment Information</h4>
              <p className="mt-1 text-sm text-gray-900">Method: {transaction.payment.method}</p>
              {transaction.payment.confirmationNumber && (
                <p className="text-sm text-gray-500">
                  Confirmation: {transaction.payment.confirmationNumber}
                </p>
              )}
            </div>
            {transaction.insurance && (
              <div>
                <h4 className="text-sm font-medium text-gray-500">Insurance Details</h4>
                <p className="mt-1 text-sm text-gray-900">Provider: {transaction.insurance.provider}</p>
                <p className="text-sm text-gray-500">Policy: {transaction.insurance.policyNumber}</p>
                <p className="text-sm text-gray-500">
                  Claim Status: {transaction.insurance.claimStatus.charAt(0).toUpperCase() + 
                  transaction.insurance.claimStatus.slice(1)}
                </p>
              </div>
            )}
          </div>

          {transaction.remarks && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-500">Remarks</h4>
              <p className="mt-1 text-sm text-gray-900">{transaction.remarks}</p>
            </div>
          )}

          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Receipt
            </button>
            {transaction.payment.status === 'failed' && (
              <button
                onClick={handleRetry}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Transaction
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 