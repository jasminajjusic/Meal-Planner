import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

const CategoryTabs: React.FC<Props> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.tab, selectedCategory === cat ? styles.tabActive : {}]}
          onPress={() => onSelectCategory(cat)}
        >
          <Text
            style={[
              styles.tabText,
              selectedCategory === cat ? styles.tabTextActive : {},
            ]}
          >
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryTabs;

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  tabActive: { backgroundColor: "#f54291" },
  tabText: { color: "#333", fontWeight: "600" },
  tabTextActive: { color: "#fff" },
});
