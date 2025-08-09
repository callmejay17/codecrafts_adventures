import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const InventoryTab = ({ isDesktop = false }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortBy, setSortBy] = useState('name');

  const categoryOptions = [
    { value: 'all', label: 'All Items' },
    { value: 'weapons', label: 'Weapons' },
    { value: 'armor', label: 'Armor' },
    { value: 'consumables', label: 'Consumables' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'rarity', label: 'Rarity' },
    { value: 'type', label: 'Type' },
    { value: 'acquired', label: 'Recently Acquired' }
  ];

  const inventory = [
    {
      id: 1,
      name: 'Debugging Sword',
      type: 'weapons',
      rarity: 'rare',
      description: `A legendary blade forged in the fires of countless debugging sessions.\n\nSpecial Abilities:\n• +25% faster bug detection\n• Highlights syntax errors in real-time\n• Grants immunity to infinite loops`,
      stats: { attack: 45, durability: 85, special: 'Bug Detection' },
      acquired: '2025-01-20',
      equipped: true,
      icon: 'Sword'
    },
    {
      id: 2,
      name: 'Logic Shield',
      type: 'armor',
      rarity: 'common',
      description: `A sturdy shield that protects against logical fallacies and runtime errors.\n\nProtection:\n• Reduces logical error damage by 30%\n• Prevents null pointer exceptions\n• Provides basic error handling`,
      stats: { defense: 25, durability: 70, special: 'Error Protection' },
      acquired: '2025-01-16',
      equipped: true,
      icon: 'Shield'
    },
    {
      id: 3,
      name: 'Refactor Potion',
      type: 'consumables',
      rarity: 'uncommon',
      description: `A magical elixir that instantly improves code quality and readability.\n\nEffects:\n• Automatically formats code\n• Removes unused variables\n• Optimizes performance by 15%\n• Duration: 30 minutes`,
      stats: { uses: 3, effect: 'Code Quality +50%', duration: '30 min' },
      acquired: '2025-01-25',
      equipped: false,
      icon: 'Beaker'
    },
    {
      id: 4,
      name: 'Algorithm Scroll',
      type: 'consumables',
      rarity: 'epic',
      description: `An ancient scroll containing the secrets of optimal algorithms.\n\nKnowledge Granted:\n• Reveals time complexity hints\n• Shows optimal solution paths\n• Provides algorithm suggestions\n• Single use item`,
      stats: { uses: 1, effect: 'Algorithm Insight', rarity: 'Epic' },
      acquired: '2025-01-28',
      equipped: false,
      icon: 'Scroll'
    },
    {
      id: 5,
      name: 'Memory Crystal',
      type: 'accessories',
      rarity: 'legendary',
      description: `A crystalline artifact that enhances learning and memory retention.\n\nEnhancements:\n• +50% XP gain from all activities\n• Permanent skill retention\n• Unlocks advanced tutorials\n• Passive learning boost`,
      stats: { xpBoost: '50%', learning: '+100%', special: 'Permanent Knowledge' },
      acquired: '2025-02-01',
      equipped: true,
      icon: 'Gem'
    },
    {
      id: 6,
      name: 'Syntax Highlighter',
      type: 'accessories',
      rarity: 'uncommon',
      description: `A mystical lens that reveals the true nature of code syntax.\n\nVisual Enhancements:\n• Color-coded syntax highlighting\n• Bracket matching assistance\n• Indentation guides\n• Theme customization`,
      stats: { clarity: '+40%', readability: '+60%', special: 'Visual Aid' },
      acquired: '2025-01-22',
      equipped: false,
      icon: 'Eye'
    }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-muted-foreground border-muted bg-muted/10';
      case 'uncommon': return 'text-success border-success bg-success/10';
      case 'rare': return 'text-primary border-primary bg-primary/10';
      case 'epic': return 'text-accent border-accent bg-accent/10';
      case 'legendary': return 'text-warning border-warning bg-warning/10';
      default: return 'text-muted-foreground border-muted bg-muted/10';
    }
  };

  const getRarityBadgeColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-muted text-muted-foreground';
      case 'uncommon': return 'bg-success text-success-foreground';
      case 'rare': return 'bg-primary text-primary-foreground';
      case 'epic': return 'bg-accent text-accent-foreground';
      case 'legendary': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredInventory = inventory?.filter(item => selectedCategory === 'all' || item?.type === selectedCategory)?.sort((a, b) => {
      switch (sortBy) {
        case 'name': return a?.name?.localeCompare(b?.name);
        case 'rarity': 
          const rarityOrder = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
          return rarityOrder?.[b?.rarity] - rarityOrder?.[a?.rarity];
        case 'type': return a?.type?.localeCompare(b?.type);
        case 'acquired': return new Date(b.acquired) - new Date(a.acquired);
        default: return 0;
      }
    });

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Filter by category"
          />
        </div>
        <div className="flex-1">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
          />
        </div>
      </div>
      {/* Inventory Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-sm p-4 text-center">
          <div className="font-pixel text-pixel-sm text-accent">{inventory?.length}</div>
          <div className="text-xs text-muted-foreground">Total Items</div>
        </div>
        <div className="bg-card border border-border rounded-sm p-4 text-center">
          <div className="font-pixel text-pixel-sm text-success">{inventory?.filter(i => i?.equipped)?.length}</div>
          <div className="text-xs text-muted-foreground">Equipped</div>
        </div>
        <div className="bg-card border border-border rounded-sm p-4 text-center">
          <div className="font-pixel text-pixel-sm text-warning">{inventory?.filter(i => i?.rarity === 'legendary')?.length}</div>
          <div className="text-xs text-muted-foreground">Legendary</div>
        </div>
        <div className="bg-card border border-border rounded-sm p-4 text-center">
          <div className="font-pixel text-pixel-sm text-primary">{inventory?.filter(i => i?.type === 'consumables')?.length}</div>
          <div className="text-xs text-muted-foreground">Consumables</div>
        </div>
      </div>
      {/* Inventory Grid */}
      <div className={`grid gap-4 ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'}`}>
        {filteredInventory?.map((item) => (
          <div
            key={item?.id}
            onClick={() => handleItemClick(item)}
            className={`relative p-4 rounded-sm border-2 cursor-pointer game-transition hover:scale-105 ${getRarityColor(item?.rarity)}`}
          >
            {/* Equipped Badge */}
            {item?.equipped && (
              <div className="absolute -top-2 -right-2 bg-success text-success-foreground rounded-sm px-2 py-1">
                <Icon name="Check" size={12} />
              </div>
            )}

            {/* Item Icon */}
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-muted rounded-sm flex items-center justify-center">
                <Icon name={item?.icon} size={24} />
              </div>
            </div>

            {/* Item Info */}
            <div className="text-center space-y-2">
              <h3 className="font-pixel text-pixel-xs text-foreground line-clamp-2">{item?.name}</h3>
              <div className={`inline-block px-2 py-1 rounded-sm text-xs font-medium capitalize ${getRarityBadgeColor(item?.rarity)}`}>
                {item?.rarity}
              </div>
              <div className="text-xs text-muted-foreground capitalize">{item?.type}</div>
            </div>
          </div>
        ))}
      </div>
      {filteredInventory?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No items found matching your criteria</p>
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedCategory('all');
              setSortBy('name');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-modal bg-background/80 backdrop-blur-sm" onClick={closeModal}>
          <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-card border border-border rounded-sm retro-shadow overflow-hidden" onClick={(e) => e?.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-sm flex items-center justify-center ${getRarityColor(selectedItem?.rarity)}`}>
                  <Icon name={selectedItem?.icon} size={32} />
                </div>
                <div>
                  <h2 className="font-pixel text-pixel-lg text-foreground">{selectedItem?.name}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-sm text-xs font-medium capitalize ${getRarityBadgeColor(selectedItem?.rarity)}`}>
                      {selectedItem?.rarity}
                    </span>
                    <span className="text-sm text-muted-foreground capitalize">{selectedItem?.type}</span>
                    {selectedItem?.equipped && (
                      <span className="px-2 py-1 bg-success text-success-foreground rounded-sm text-xs font-medium">
                        Equipped
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={closeModal} iconName="X" iconSize={20} />
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-pixel text-pixel-sm text-foreground mb-3">Description</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {selectedItem?.description}
                  </p>
                </div>

                {/* Stats */}
                <div>
                  <h3 className="font-pixel text-pixel-sm text-foreground mb-3">Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedItem?.stats)?.map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-muted/20 rounded-sm">
                        <span className="text-sm text-muted-foreground capitalize">{key}</span>
                        <span className="text-sm text-foreground font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acquisition Info */}
                <div>
                  <h3 className="font-pixel text-pixel-sm text-foreground mb-3">Acquisition</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={16} />
                    <span>Acquired on {new Date(selectedItem.acquired)?.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              {selectedItem?.type === 'consumables' && selectedItem?.stats?.uses > 0 && (
                <Button variant="default" iconName="Zap" iconPosition="left">
                  Use Item
                </Button>
              )}
              {!selectedItem?.equipped && selectedItem?.type !== 'consumables' && (
                <Button variant="outline" iconName="Shield" iconPosition="left">
                  Equip
                </Button>
              )}
              {selectedItem?.equipped && (
                <Button variant="ghost" iconName="X" iconPosition="left">
                  Unequip
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTab;