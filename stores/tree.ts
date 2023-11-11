export const useTreeStore = defineStore("tree", {
  state: () => ({ _selectedStrain: "" }),
  getters: {
    selectedStrain: (state) => state._selectedStrain,
  },
  actions: {
    setSelectedStrain(id: string) {
      console.info("setSelectedStrain", id);
      this._selectedStrain = id;
    },
  },
});
