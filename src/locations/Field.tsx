import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Paragraph,
  Pill,
  Text,
  TextInput,
} from "@contentful/f36-components";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import { useCMA, useSDK } from "@contentful/react-apps-toolkit";
import { useDebounce } from "../hooks/useDebounce";

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const cma = useCMA();

  const BASE_SLUG_REMOVE = sdk.parameters.instance.baseSlugRemove;
  const PARENT_FIELD_NAME = sdk.parameters.instance.parentFieldName;
  const SLUG_FIELD_NAME = sdk.parameters.instance.slugFieldName;
  const DEFAULT_LOCALE = sdk.field.locale;

  const parentFieldContent = sdk.entry.fields[PARENT_FIELD_NAME];
  const slugFieldContent = sdk.entry.fields[SLUG_FIELD_NAME];

  const [customPath, setCustomPath] = useState<string>("");
  const [isCustomPathInvalid, setIsCustomPathInvalid] =
    useState<boolean>(false);

  const [urlPaths, setUrlPaths] = useState<string[]>(
    sdk.field.getValue() ?? []
  );

  // path defined by slug, can't be deleted
  const [slugValue, setSlugValue] = useState<string>(urlPaths[0] ?? "");
  const mainUrlPath = useDebounce<string>(slugValue, 800);

  const [redundant, setRedundant] = useState<boolean>(false);

  const getParentSlug = useCallback(
    async (entryId: string): Promise<string[]> => {
      const slugs: string[] = [];
      if (entryId === sdk.entry.getSys().id) {
        setRedundant(true);
        return slugs;
      }

      const entryContent = await cma.entry.get({ entryId });

      if (
        entryContent &&
        entryContent?.fields[PARENT_FIELD_NAME] &&
        entryContent?.fields[PARENT_FIELD_NAME][DEFAULT_LOCALE]?.sys?.id
      ) {
        const parentContentSlug = await getParentSlug(
          entryContent.fields[PARENT_FIELD_NAME][DEFAULT_LOCALE].sys.id
        );
        slugs.push(...parentContentSlug);
      }

      slugs.push(entryContent.fields[SLUG_FIELD_NAME][DEFAULT_LOCALE]);
      return slugs;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const addCustomPath = async () => {
    if (!/^\/[/.a-zA-Z0-9-]+$/.test(customPath)) {
      setIsCustomPathInvalid(true);
      return;
    }

    setUrlPaths([...urlPaths, customPath]);
    await sdk.field.setValue([...urlPaths, customPath]);
    setCustomPath("");
  };

  const deleteCustomPath = async (path: string) => {
    const newUrlPaths = [...urlPaths].filter((u) => u !== path);

    setUrlPaths(newUrlPaths);
    await sdk.field.setValue(newUrlPaths);
  };

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, [sdk.window]);

  useEffect(() => {
    const updateFieldValue = async () => {
      console.log('old', urlPaths);
      let newUrlPaths = [...urlPaths].filter((u) => u !== mainUrlPath);

      if (newUrlPaths.length > 0) {
        newUrlPaths.unshift(mainUrlPath);
      } else {
        newUrlPaths = [mainUrlPath];
      }
      console.log('new', newUrlPaths);
      setUrlPaths(newUrlPaths);
      await sdk.field.setValue(newUrlPaths);
    };

    if (mainUrlPath && mainUrlPath !== "") {
      updateFieldValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainUrlPath]);

  useEffect(() => {
    parentFieldContent.onValueChanged(async (contentReference: any) => {
      setRedundant(false);
      const urlPathTemp = [slugFieldContent.getValue()];

      if (contentReference?.sys?.id) {
        const parentContentSlugs = await getParentSlug(contentReference.sys.id);
        urlPathTemp.unshift(...parentContentSlugs);
      }

      let urlPathString = ["", ...urlPathTemp].join("/");
      if (BASE_SLUG_REMOVE && BASE_SLUG_REMOVE !== "") {
        const re = new RegExp(`^${BASE_SLUG_REMOVE}`);

        urlPathString = urlPathString.replace(re, "");
        urlPathString = urlPathString.match("^/")
          ? urlPathString
          : `/${urlPathString}`;
      }

      setSlugValue(urlPathString);
    });

    slugFieldContent.onValueChanged(async (slugFieldText: string) => {
      const urlPathTemp = urlPaths[0]
        ? urlPaths[0].split("/").slice(0, -1)
        : [""];
      urlPathTemp.push(slugFieldText);

      let urlPathString = urlPathTemp.join("/");
      if (BASE_SLUG_REMOVE && BASE_SLUG_REMOVE !== "") {
        const re = new RegExp(`^${BASE_SLUG_REMOVE}`);

        urlPathString = urlPathString.replace(re, "");
        urlPathString = urlPathString.match("^/")
          ? urlPathString
          : `/${urlPathString}`;
      }

      setSlugValue(urlPathString);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Flex marginBottom="spacingS" flexDirection="column" fullWidth>
        <TextInput
          type="text"
          value={customPath}
          isInvalid={isCustomPathInvalid}
          placeholder="Add custom path ([Enter] to add)"
          onChange={(e) => setCustomPath(e.target.value)}
          onKeyDown={(e) => {
            setIsCustomPathInvalid(false);
            if (e.key === "Enter") {
              addCustomPath();
            }
          }}
        />
        {isCustomPathInvalid && (
          <Text fontSize="fontSizeS" fontColor="red500">
            * Invalid path
          </Text>
        )}
      </Flex>
      <Flex gap="spacingS" flexWrap="wrap" fullWidth>
        {urlPaths.map((path: string, i: number) => (
          <Pill
            key={`pill-path-${i}`}
            onClose={
              i > 0
                ? () => {
                    deleteCustomPath(path);
                  }
                : undefined
            }
            label={path}
          />
        ))}
      </Flex>
      {redundant && (
        <Paragraph>
          <Text fontSize="fontSizeS" fontColor="orange500">
            * Possible cyclic redundancy of relationships
          </Text>
        </Paragraph>
      )}
    </Box>
  );
};

export default Field;
