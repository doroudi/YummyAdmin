export default function useFilter() {
    function enumToFilter(type: any): any[] {
        return Object.keys(type).filter(key => !Number.isNaN(parseInt(key,10))).map((key) => ({
          label: type[key],
          value: key.replace(' ', '').toLowerCase(),
        }))
    }

    return {
        enumToFilter
    }
}

