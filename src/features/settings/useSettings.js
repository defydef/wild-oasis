import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useSettings() {
  const {
    isLoading: isLoadingSettings,
    data: settings,
    error: retrieveSettingsError,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoadingSettings, settings, retrieveSettingsError };
}

export default useSettings;
