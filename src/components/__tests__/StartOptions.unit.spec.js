import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import StartOptions from "../StartOptions.vue";

describe("selectedCategory watcher", () => {
  it("emits category-changed when selectedCategory is changed", async () => {
    const wrapper = mount(StartOptions);
    const select = wrapper.find("select.input-field");
    await select.setValue("Mathematics");
    await select.trigger("change");

    expect(wrapper.emitted("category-changed")).toBeTruthy();
  });
});
