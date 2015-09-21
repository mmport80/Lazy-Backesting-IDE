var w = null;

history.INDEX_GSPC_weight != null ? w = history.INDEX_GSPC_weight[0] : w = 0.511;

weight.INDEX_GSPC = 4 * w * (1 - w);
