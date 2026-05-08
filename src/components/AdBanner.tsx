import { useSubscription } from "@/hooks/useSubscription";
import { Card } from "@/components/ui/card";

const AdBanner = () => {
  const { plan } = useSubscription();
  
  // Show only for free users
  if (plan !== "free") return null;

  return (
    <Card className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 text-center">
      <div className="h-20 flex items-center justify-center">
        <div>
          <p className="text-xs text-orange-800 font-medium mb-1">Advertisement</p>
          <p className="text-sm font-semibold text-orange-900">Ad will appear here</p>
          <p className="text-xs text-orange-700 mt-1">Upgrade to remove ads</p>
        </div>
      </div>
    </Card>
  );
};

export default AdBanner;

